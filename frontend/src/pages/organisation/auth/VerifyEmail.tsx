import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { maskEmail } from "@/helpers/maskEmail";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const maskedEmail = maskEmail(email);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    navigate("/organization/team-setup/new");
  }
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Card className="w-[350px] bg-[#1a202c]">
        <CardHeader className="space-y-6 text-center">
          <CardTitle className="text-[#3b82f6] text-lg text-center">
            Verify Your Account
          </CardTitle>
          <CardDescription className="space-y-3">
            <h2 className="text-3xl text-white">We just emailed you.</h2>
            <p>Please enter the code we emailed you.</p>
            <p className="text-sm">{maskedEmail}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center justify-center w-full flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot
                            className="border-gray-300 w-12 h-12 bg-[#2F3D53]"
                            index={0}
                          />
                          <InputOTPSlot
                            className="border-gray-300 w-12 h-12 bg-[#2F3D53]"
                            index={1}
                          />
                          <InputOTPSlot
                            className="border-gray-300 w-12 h-12 bg-[#2F3D53]"
                            index={2}
                          />
                          <InputOTPSlot
                            className="border-gray-300 w-12 h-12 bg-[#2F3D53]"
                            index={3}
                          />
                          <InputOTPSlot
                            className="border-gray-300 w-12 h-12 bg-[#2F3D53]"
                            index={4}
                          />
                          <InputOTPSlot
                            className="border-gray-300 w-12 h-12 bg-[#2F3D53]"
                            index={5}
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Verify</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
