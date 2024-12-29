import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { organizationRegisterSchema } from "@/lib/organizationValidator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const OrganizationRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationRegisterSchema),
  });
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("file", file, { shouldValidate: true });
    }
  };
  const uploadedFile = watch("file");

  type OrganizationFormData = z.infer<typeof organizationRegisterSchema>;

  const onRegisterOrganization = (data: OrganizationFormData) => {
    console.log("Form submitted", data);
    navigate("/organization/register/verify-email", {
      state: { email: data.email },
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Card className="w-[350px] bg-[#1a202c]">
        <CardHeader>
          <CardTitle className="text-[#3b82f6] text-lg">
            Create Organization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="organization-form"
            onSubmit={handleSubmit(onRegisterOrganization)}
          >
            {step === 1 && (
              <div className="space-y-5">
                <>
                  <div className="space-y-2">
                    <Label htmlFor="file">Logo</Label>
                    <div className="flex gap-3 items-center">
                      <div className="h-12 w-12 rounded-md bg-transparent border-[#ddd] border flex items-center justify-center overflow-hidden">
                        {uploadedFile ? (
                          <img
                            src={URL.createObjectURL(uploadedFile)}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img src="/plus.png" alt="Add" className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex flex-col ">
                        <Input
                          type="file"
                          id="file"
                          accept="image/png, image/jpeg"
                          {...register("file")}
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                        />

                        <Button
                          onClick={handleFileInputClick}
                          variant="outline"
                          className="bg-transparent text-xs font-semibold"
                        >
                          Upload
                        </Button>
                        {errors.file && (
                          <p className="text-red-500 text-xs mt-2">
                            {errors.file.message?.toString() ||
                              "Invalid file input"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Name of your project"
                      className="bg-[#2F3D53]"
                      {...register("name")}
                    />
                    {errors?.name && (
                      <p className="text-red-500 text-xs">
                        {errors?.name?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      className="bg-[#2F3D53] h-28"
                      placeholder="Type your message here."
                      {...register("description")}
                    />
                    {errors?.description && (
                      <p className="text-red-500 text-xs">
                        {errors?.description?.message}
                      </p>
                    )}
                  </div>
                </>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter Email"
                    className="bg-[#2F3D53]"
                    type="email"
                    {...register("email")}
                  />
                  {errors?.email && (
                    <p className="text-red-500 text-xs">
                      {errors?.email?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="password">Password</Label>

                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="Enter  password"
                      className="bg-[#2F3D53] pr-10"
                      type={isPasswordVisible ? "text" : "password"}
                      {...register("password")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-5 transform -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <EyeOff size={"15px"} className="text-gray-400" />
                      ) : (
                        <Eye size={"15px"} className="text-gray-400" />
                      )}
                    </button>
                    {errors?.password && (
                      <p className="text-red-500 text-xs mt-2">
                        {errors?.password?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-5">
          {step === 1 ? (
            <Button className="ml-auto" onClick={handleNextStep}>
              Next <ArrowRight />
            </Button>
          ) : (
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={handlePreviousStep}>
                <ArrowLeft /> Back
              </Button>
              <Button
                className="ml-auto"
                type="submit"
                form="organization-form"
              >
                Create
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrganizationRegister;
