
'use server';

export interface HealthLogEntry {
  date: string;
  event: string;
  details: string;
}

const mockData: Record<string, HealthLogEntry[]> = {
  "res-001": [
    { date: "2024-05-15", event: "Routine Checkup", details: "Blood pressure normal, vitals stable." },
    { date: "2024-05-18", event: "Medication Adjustment", details: "Increased vitamin D intake based on recent bloodwork." },
    { date: "2024-05-20", event: "Physical Therapy", details: "Participated in light walking exercise, showed good progress." }
  ],
  "res-002": [
    { date: "2024-05-10", event: "Observation", details: "Resident reported mild fatigue in the morning." },
    { date: "2024-05-12", event: "Rest Day", details: "Resident rested most of the day, mood improved by evening." }
  ]
};

export async function getResidentHealthLogs(
  residentId: string,
  startDate: string,
  endDate: string
): Promise<HealthLogEntry[]> {
  const logs = mockData[residentId] || [];
  return logs.filter(log => log.date >= startDate && log.date <= endDate);
}
