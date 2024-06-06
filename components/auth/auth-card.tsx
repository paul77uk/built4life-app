import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BackButton } from "./back-button";
import Socials from "./socials";
import { Separator } from "../ui/separator";

type CardWrapperProps = {
  children: React.ReactNode;
  cardTitle: string;
  backButtonHref: string;
  backButtonLabel: string;
  showSocials?: boolean;
};

export const AuthCard = ({
  children,
  cardTitle,
  backButtonHref,
  backButtonLabel,
  showSocials,
}: CardWrapperProps) => {
  return (
    <main className="flex justify-center h-[calc(100vh-80px)] items-center">
      <Card className="max-[320px]:w-[250px] min-[321px]:w-5/6 sm:w-[500px] py-2">
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showSocials && (
          <CardFooter >
            <Socials />
          </CardFooter>
        )}
      </Card>
    </main>
  );
};
