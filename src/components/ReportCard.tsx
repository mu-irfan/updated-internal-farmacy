import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReportCard: React.FC<ReportCardProps> = ({ title, value }) => (
  <Card className="relative py-5 rounded-xl text-center bg-primary/10 transition-all delay-75 group/number dark:shadow-2xl ">
    <CardHeader className="space-y-0 pb-2">
      <CardTitle className="text-3xl lg:text-6xl font-bold text-primary dark:text-green-500">
        {value}
      </CardTitle>
    </CardHeader>
    <CardContent className="dark:text-farmacieGrey">
      <div className="text-sm font-medium lg:pt-4">{title}</div>
    </CardContent>
    <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-full mx-auto h-96 bg-primary/5 dark:bg-primary/10 rounded blur-3xl z-0" />
  </Card>
);

export default ReportCard;
