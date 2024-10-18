export const finalVersionCreator = (
  date,
  startDate,
  finalDate,
  childType1,
  childType2,
  doctor,
  name,
  birthDate,
  diagnosis,
  deferment
) => {
  const finalVersion = {};
  finalVersion.date = date;
  finalVersion.startDate = startDate;
  finalVersion.finalDate = finalDate;
  finalVersion.childType1 = childType1;
  finalVersion.childType2 = childType2;
  finalVersion.doctor = doctor;
  finalVersion.name = name;
  finalVersion.birthDate = birthDate;
  finalVersion.diagnosis = diagnosis;
  finalVersion.deferment = deferment;
  return finalVersion;
};
