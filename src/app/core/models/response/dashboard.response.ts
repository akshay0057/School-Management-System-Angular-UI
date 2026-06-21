export interface DashboardResponse {
  totalStudents: number;
  totalStaff: number;
  totalClasses: number;
  totalSections: number;
  todayStudentAttendance: number;
  todayStaffAttendance: number;
  todayCollection: number;
  monthlyCollection: number;
  pendingFeeStudents: number;
}