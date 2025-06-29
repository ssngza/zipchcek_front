import { ThemeToggle } from "@/components/ThemeToggle";
import { Container, Flex } from "@/components/ui/base";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/contexts/AuthContext";
import { FileText, History, LogIn, LogOut, Upload, User } from "lucide-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar(): React.ReactNode {
  const { isLoggedIn, logout, user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-background border-b border-border py-3 sticky top-0 z-10">
      <Container>
        <Flex justify="between" align="center">
          <Link to="/" className="flex items-center space-x-2 mr-4">
            <h1 className="text-2xl font-bold text-primary">ZipCheck</h1>
          </Link>

          <Flex
            gap={4}
            align="center"
            className="overflow-x-auto pb-1 hide-scrollbar"
          >
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/upload"
                  icon={<Upload size={18} />}
                  label="업로드"
                />
                <NavLink
                  to="/guide"
                  icon={<FileText size={18} />}
                  label="등기안내"
                />

                {/* 프로필 드롭다운 메뉴 */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <User size={18} />
                      <span className=" sm:inline">
                        {user?.name || "프로필"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48 z-50"
                    side="bottom"
                    align="start"
                    avoidCollisions={true}
                  >
                    <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/history">
                      <DropdownMenuItem>
                        <History size={16} className="mr-2" />
                        기록
                      </DropdownMenuItem>
                    </Link>
                    {/* <Link to="/profile">
                      <DropdownMenuItem>
                        <User size={16} className="mr-2" />
                        프로필
                      </DropdownMenuItem>
                    </Link> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut size={16} className="mr-2" />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <LogIn size={18} />
                  <span className="hidden sm:inline">로그인</span>
                </Button>
              </Link>
            )}

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
