import { appointmentModel } from "../../../database/models/appointment.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";

const createAppointment = catchError(async (req, res, next) => {
  req.body.doctor = req.user._id;
  let appointment = new appointmentModel(req.body);
  await appointment.save();

  let doctor = await userModel.findById(req.body.doctor);

  doctor.createdAppointments.push(appointment._id);

  await doctor.save();

  res.json({
    message: "Appointment slot created successfully",
    appointment,
  });
});

 const bookAppointment = catchError(async (req, res, next) => {
  // Find the appointment and ensure it's available
  const appointment = await appointmentModel.findById(req.params.id);
  if (!appointment || appointment.status !== "available") {
    return res
      .status(400)
      .json({ message: "Appointment not available for booking" });
  }

  // Update the appointment to book it for the patient
  appointment.patient = req.user._id; // Assuming patient is authenticated
  appointment.status = "booked";
  await appointment.save();

  let patient = await userModel.findById(req.user._id);

  // Add the appointment to the patient's `appointmentsBooked` list
  patient.bookedAppointments.push(appointment._id);
  await patient.save();

  res.status(200).json({
    message: "Appointment booked successfully",
    appointment,
  });
});

 const updateAppointmentStatus = catchError(async (req, res, next) => {
  const { status } = req.body;

  // Find the appointment and update its status
  const appointment = await appointmentModel.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  res.json({
    message: `Appointment status updated to ${status}`,
    appointment
  });
});




const deleteAppointment = catchError(async (req, res, next) => {
  const { id } = req.params;
  const doctorId = req.user._id; // Assuming req.user._id is the logged-in doctor

  // Find the appointment by its ID and ensure the doctor is the one who created it
  const appointment = await appointmentModel.findOneAndDelete({
    _id: id,
    doctor: doctorId,
  });

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found or unauthorized to delete" });
  }

  // Remove the appointment from the doctor's appointmentsCreated array
  await userModel.updateOne(
    { _id: doctorId },
    { $pull: { createdAppointments: id } }
  );

  // If the appointment was booked by a patient, remove it from the patient's appointmentsBooked array
  if (appointment.patient) {
    await userModel.updateOne(
      { _id: appointment.patient },
      { $pull: { bookedAppointments: id } }
    );
  }

  res.json({
    message: "Appointment deleted successfully",
  });
});




export { createAppointment ,bookAppointment ,updateAppointmentStatus,deleteAppointment};
