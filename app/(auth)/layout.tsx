import { DemoAccount } from "@/components/demo-account";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <DemoAccount />
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
