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
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const OrganizationRegister = () => {
  const [progress, setProgress] = useState(5);
  const userImage = false;
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
  };
  const fileInputRef = useRef(null);

  // Trigger file input click
  // const handleButtonClick = () => {
  //   fileInputRef.current.click();
  // };
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
            {progress < 50 ? (
              <div className="space-y-5">
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
              </div>
            ) : (
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
                  <Input
                    id="password"
                    placeholder="Enter password"
                    className="bg-[#2F3D53]"
                    type="password"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    placeholder="Enter Confirm password"
                    className="bg-[#2F3D53]"
                    type="password"
                  />
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-5">
          <Button className="ml-auto" onClick={() => setProgress(50)}>
            Next
          </Button>
          <Progress value={progress} className="w-[100%]" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrganizationRegister;
