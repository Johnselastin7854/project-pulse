import { validateEmail } from "@/helpers/validateEmail";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const MultiEmailInput = () => {
  const { toast } = useToast();
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      if (validateEmail(inputValue)) {
        setEmails([...emails, inputValue.trim()]);
        setInputValue("");
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    }
  };

  const handleRemoveEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleSendEmails = () => {
    console.log("Emails:", emails);
  };

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <Input
        type="text"
        placeholder="Enter email and press Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddEmail}
        className="bg-[#2F3D53]"
      />

      <div className="space-y-2">
        {emails.map((email, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-[#2F3D53] px-4 py-2 rounded-md"
          >
            <span className="text-white">{email}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRemoveEmail(index)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <Button
        onClick={handleSendEmails}
        disabled={emails.length === 0}
        className="w-full"
      >
        Send
      </Button>
    </div>
  );
};

export default MultiEmailInput;
