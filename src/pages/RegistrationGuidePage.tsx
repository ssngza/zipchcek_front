import RegistrationGuideContent from "@/components/RegistrationGuideContent";
import RegistrationGuideFAQ from "@/components/RegistrationGuideFAQ";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet";

export default function RegistrationGuidePage() {
  return (
    <>
      <Helmet>
        <title>등기부등본 발급 안내 | 집체크</title>
        <meta
          name="description"
          content="등기부등본 발급 방법, 절차, 비용 및 필요 서류에 대한 안내입니다."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-6">
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                등기부등본 발급 안내
              </h1>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                부동산 거래 시 필요한 등기부등본 발급 방법을 안내해드립니다.
              </p>
            </div>

            <Tabs defaultValue="guide" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 print:hidden">
                <TabsTrigger value="guide">발급 안내</TabsTrigger>
                <TabsTrigger value="faq">자주 묻는 질문</TabsTrigger>
              </TabsList>
              <TabsContent value="guide" className="mt-0">
                <Card className="border shadow-sm">
                  <CardContent className="pt-6">
                    <RegistrationGuideContent />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="faq" className="mt-0">
                <Card className="border shadow-sm">
                  <CardContent className="pt-6">
                    <RegistrationGuideFAQ />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
}
