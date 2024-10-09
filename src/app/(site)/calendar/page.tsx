import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pricing Page | Play SaaS Starter Kit and Boilerplate for Next.js",
  description: "This is pricing page description",
};

const CalendarPage = () => {
  return (
    <>
      <Breadcrumb pageName="Calendar" />
    </>
  );
};

export default CalendarPage;
