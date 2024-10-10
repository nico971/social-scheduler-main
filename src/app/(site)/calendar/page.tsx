import ToasterContext from "@/app/api/contex/ToasetContex";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { authOptions } from "@/utils/auth"; // Chemin vers tes options NextAuth
import { getServerSession } from "next-auth/next";

export const metadata: Metadata = {
  title: "Pricing Page | Play SaaS Starter Kit and Boilerplate for Next.js",
  description: "This is pricing page description",
};

const CalendarPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Si l'utilisateur n'est pas connecté, on affiche un toaster et on redirige
    return (
      <>
        <ToasterContext msg="Vous devez être connecté pour accéder à cette page." color="red" />
      </>
    );
  }

  return (
    <>
      <Breadcrumb pageName="Calendar" />
    </>
  );
};

export default CalendarPage;
