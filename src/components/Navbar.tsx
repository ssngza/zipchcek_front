import { ThemeToggle } from "@/components/ThemeToggle";
import { Container, Flex } from "@/components/ui/base";
import { Button } from "@/components/ui/button";
import { FileText, History, Home, Upload, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar(): React.ReactNode {
  return (
    <nav className="bg-background border-b border-border py-3 sticky top-0 z-10">
      <Container>
        <Flex justify="between" align="center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">집체크</span>
          </Link>

          <Flex
            gap={4}
            align="center"
            className="overflow-x-auto pb-1 hide-scrollbar"
          >
            <NavLink to="/" icon={<Home size={18} />} label="홈" />
            <NavLink to="/upload" icon={<Upload size={18} />} label="업로드" />
            <NavLink to="/history" icon={<History size={18} />} label="기록" />
            <NavLink
              to="/registration-guide"
              icon={<FileText size={18} />}
              label="등기안내"
            />
            <NavLink to="/profile" icon={<User size={18} />} label="프로필" />
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
}

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  // useLocation 훅을 사용하여 현재 경로 확인
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <Button
        variant={isActive ? "default" : "ghost"}
        size="sm"
        className="flex items-center gap-1"
        aria-current={isActive ? "page" : undefined}
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </Button>
    </Link>
  );
};
