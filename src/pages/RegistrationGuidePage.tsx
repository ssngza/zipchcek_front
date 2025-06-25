import Navbar from "@/components/Navbar";
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
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight">
                등기부등본 발급 안내
              </h1>
              <p className="text-muted-foreground mt-2">
                부동산 거래 시 필요한 등기부등본 발급 방법을 안내해드립니다.
              </p>
            </div>

            <Tabs defaultValue="guide" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="guide">발급 안내</TabsTrigger>
                <TabsTrigger value="faq">자주 묻는 질문</TabsTrigger>
              </TabsList>
              <TabsContent value="guide">
                <Card>
                  <CardContent className="pt-6">
                    <RegistrationGuideContent />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="faq">
                <Card>
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
