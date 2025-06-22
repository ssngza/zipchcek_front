import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-primary">ZipCheck</h1>
        <p className="text-lg text-muted-foreground">전세사기 예방 서비스</p>
        <div className="p-4 bg-card rounded-lg border">
          <p className="text-sm">TailwindCSS 설정이 완료되었습니다!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
