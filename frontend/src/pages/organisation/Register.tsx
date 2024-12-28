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

const OrganizationRegister = () => {
  const [step, setStep] = useState(1);
  const userImage = false;
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
  };
  const fileInputRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleCofirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  // Trigger file input click
  // const handleButtonClick = () => {
  //   fileInputRef.current.click();
  // };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
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
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-5">
                <>
                  <div className="space-y-2">
                    <Label htmlFor="picture">Logo</Label>

                    <div className="flex gap-3 ">
                      <div className="h-12 w-12 rounded-md bg-transparent border-[#ddd] border flex items-center justify-center overflow-hidden">
                        {userImage ? (
                          <img
                            src={userImage}
                            alt="User"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img src="/plus.png" alt="Add" className="w-4 h-4" />
                        )}
                      </div>
                      <Input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        // onChange={(e) => {
                        //   console.log("Selected file:", e.target.files[0]);
                        // }}
                      />
                      <Button
                        // onClick={handleButtonClick}
                        variant="outline"
                        className="bg-transparent text-xs font-semibold"
                      >
                        Upload
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Name of your project"
                      className="bg-[#2F3D53]"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      className="bg-[#2F3D53]"
                      placeholder="Type your message here."
                    />
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
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="password">Password</Label>

                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="Enter  password"
                      className="bg-[#2F3D53] pr-10"
                      type={isPasswordVisible ? "text" : "password"}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <EyeOff size={"15px"} className="text-gray-400" />
                      ) : (
                        <Eye size={"15px"} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 relative">
                  <Label htmlFor="confirm-password">Confirm Password</Label>

                  <div className="relative">
                    <Input
                      id="confirm-password"
                      placeholder="Enter confirm password"
                      className="bg-[#2F3D53] pr-10"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={toggleCofirmPasswordVisibility}
                    >
                      {isConfirmPasswordVisible ? (
                        <EyeOff size={"15px"} className="text-gray-400" />
                      ) : (
                        <Eye size={"15px"} className="text-gray-400" />
                      )}
                    </button>
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
              <Button className="ml-auto" type="submit">
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
