import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Mail, Lock, User, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { authService } from "@/lib/auth-service";
import { useI18n } from "@/contexts/I18nContext";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const { t } = useI18n();
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.firstName || !formData.lastName) {
      setError(t("register.errorFirstLast"));
      return;
    }

    if (formData.password.length < 8) {
      setError(t("register.errorPasswordLength"));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("register.errorPasswordMismatch"));
      return;
    }

    setLoading(true);

    const response = await authService.register(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName,
      formData.role
    );

    if (response.success) {
      setLocation("/dashboard");
    } else {
      setError(response.error || t("register.errorRegistrationFailed"));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{t("common.appName")}</span>
        </div>

        {/* Card */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <h1 className="text-2xl font-bold text-white mb-2">{t("register.createAccount")}</h1>
            <p className="text-purple-300 mb-8">{t("register.joinOurCommunity")}</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-red-200 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">{t("register.firstName")}</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                  <Input
                    type="text"
                    name="firstName"
                    placeholder={t("register.firstNamePlaceholder")}
                    value={formData.firstName}
                    onChange={handleChange}
                    className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-purple-400/50 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">{t("register.lastName")}</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                  <Input
                    type="text"
                    name="lastName"
                    placeholder={t("register.lastNamePlaceholder")}
                    value={formData.lastName}
                    onChange={handleChange}
                    className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-purple-400/50 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">{t("register.email")}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                <Input
                  type="email"
                  name="email"
                    placeholder={t("register.emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-purple-400/50 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">{t("register.selectRole")}</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-700/50 border border-purple-500/30 text-white rounded-lg focus:outline-none focus:border-purple-500"
              >
                <option value="student">{t("login.student")}</option>
                <option value="teacher">{t("login.teacher")}</option>
                <option value="parent">{t("login.parent")}</option>
              </select>
            </div>

            {/* Password */}
            <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">{t("register.password")}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                <Input
                  type="password"
                  name="password"
                    placeholder={t("register.passwordPlaceholder")}
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-purple-400/50 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
                <p className="text-xs text-purple-400 mt-1">{t("register.passwordHint")}</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">{t("register.confirmPassword")}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                <Input
                  type="password"
                  name="confirmPassword"
                placeholder={t("register.passwordPlaceholder")}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-purple-400/50 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-purple-500/30 bg-slate-700/50 mt-1" required />
                <span className="text-xs text-purple-300">{t("register.termsAgreement")}</span>
            </label>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 py-6 text-lg font-semibold mt-6"
            >
              {loading ? t("register.creatingAccount") : t("register.createAccountButton")}
            </Button>
          </form>

          {/* Sign In Link */}
            <p className="text-center text-purple-300 mt-8">
            {t("register.alreadyHaveAccount")} <a href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition">{t("login.signInButton")}</a>
            </p>
        </div>
      </div>
    </div>
  );
}
