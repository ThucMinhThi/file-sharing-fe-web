"use client";

import { useState, Component } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RegisterForm, {
  RegisterFormData,
} from "@/components/auth/RegisterForm";

export default class RegisterPage extends Component {
  render() {
    const [formData, setFormData] = useState<RegisterFormData>({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      enableTotp: false,
    });

    const router = useRouter();

    const updateField = (field: keyof RegisterFormData, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        toast.error("Mật khẩu và xác nhận mật khẩu không khớp.");
        return;
      }
      // TODO: Implement actual registration logic
      if (
        formData.email === "test@example.com" &&
        formData.password === "testP455w0rd"
      ) {
        if (formData.enableTotp) {
          router.push("/auth/totp-setup");
        } else {
          router.push("/auth/login");
        }
      } else {
        toast.error("Đăng ký thất bại. Vui lòng thử lại.");
      }
    };

    return (
      <RegisterForm
        formData={formData}
        updateField={updateField}
        handleSubmit={handleSubmit}
      />
    );
  }
}
