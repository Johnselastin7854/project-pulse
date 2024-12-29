import MultiEmailInput from "@/components/common/MultiEmailInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InviteMember = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Card className="w-[500px] bg-[#1a202c]">
        <CardHeader>
          <CardTitle className="text-2xl leading-9 text-center">
            Invite people to your <br /> Workplace :
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MultiEmailInput />
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteMember;
