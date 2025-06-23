import { Container, Flex } from "@/components/ui/base";
import { Button } from "@/components/ui/button";
import { History, Home, Upload, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm py-3 sticky top-0 z-10">
      <Container>
        <Flex justify="between" align="center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">집체크</span>
          </Link>

          <Flex gap={4} align="center">
            <NavLink to="/" icon={<Home size={18} />} label="홈" />
            <NavLink to="/upload" icon={<Upload size={18} />} label="업로드" />
            <NavLink to="/history" icon={<History size={18} />} label="기록" />
            <NavLink to="/profile" icon={<User size={18} />} label="프로필" />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  // 현재 경로와 일치하는지 확인하는 로직 (실제로는 useLocation 훅을 사용하여 구현)
  const isActive = window.location.pathname === to;

  return (
    <Link to={to}>
      <Button
        variant={isActive ? "default" : "ghost"}
        size="sm"
        className="flex items-center gap-1"
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </Button>
    </Link>
  );
};
