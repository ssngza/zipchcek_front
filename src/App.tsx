import React from "react";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-primary">ZipCheck</h1>
        <p className="text-lg text-muted-foreground">전세사기 예방 서비스</p>
        <div className="p-4 bg-card rounded-lg border space-y-4">
          <p className="text-sm">
            TailwindCSS와 Shadcn UI 설정이 완료되었습니다!
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="default">기본 버튼</Button>
            <Button variant="outline">아웃라인 버튼</Button>
          </div>
          <div className="flex gap-2 justify-center">
            <Button variant="secondary" size="sm">
              보조 버튼
            </Button>
            <Button variant="destructive" size="lg">
              삭제 버튼
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
