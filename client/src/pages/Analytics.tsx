
import React from "react";
import { useFiles } from "@/hooks/useFiles";
import { useExams } from "@/hooks/useExams";
import { useQuizzes } from "@/hooks/useQuizzes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Users, BookOpen, Calendar } from "lucide-react";

export default function Analytics() {
  const { files } = useFiles();
  const { exams } = useExams();
  const { quizzes } = useQuizzes();

  // Mock data for user analytics
  const userMetrics = {
    totalVisits: 1205,
    uniqueVisitors: 342,
    todayVisits: 45,
    averageTimeSpent: "12:30",
  };

  // Calculate subject distributions
  const calculateSubjectDistribution = (items: any[]) => {
    return items?.reduce((acc: any, item) => {
      acc[item.subject] = (acc[item.subject] || 0) + 1;
      return acc;
    }, {});
  };

  const filesBySubject = calculateSubjectDistribution(files);
  const examsBySubject = calculateSubjectDistribution(exams);
  const quizzesBySubject = calculateSubjectDistribution(quizzes);

  const getArabicSubject = (subject: string) => {
    const subjects: Record<string, string> = {
      'math': 'الرياضيات',
      'physics': 'الفيزياء',
      'chemistry': 'الكيمياء',
      'biology': 'الأحياء',
      'arabic': 'اللغة العربية',
      'english': 'اللغة الإنجليزية',
      'islamic': 'الاسلامية',
      'constitution': 'الدستور'
    };
    return subjects[subject.toLowerCase()] || subject;
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ff7c43', '#a05195'];

  const formatChartData = (distribution: any) => {
    return Object.entries(distribution || {}).map(([name, value]) => ({
      name: getArabicSubject(name),
      value
    }));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">تحليلات النظام</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">زيارات اليوم</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userMetrics.todayVisits}</div>
            <p className="text-xs text-muted-foreground">
              زائر
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الزيارات</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userMetrics.totalVisits}</div>
            <p className="text-xs text-muted-foreground">
              زيارة
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الزوار المميزين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userMetrics.uniqueVisitors}</div>
            <p className="text-xs text-muted-foreground">
              زائر مميز
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط وقت الزيارة</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userMetrics.averageTimeSpent}</div>
            <p className="text-xs text-muted-foreground">
              دقيقة
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>توزيع الملفات حسب المواد</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={formatChartData(filesBySubject)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {formatChartData(filesBySubject).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>توزيع الاختبارات القصيرة حسب المواد</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={formatChartData(examsBySubject)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {formatChartData(examsBySubject).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>توزيع الاختبارات الإلكترونية حسب المواد</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={formatChartData(quizzesBySubject)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {formatChartData(quizzesBySubject).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
