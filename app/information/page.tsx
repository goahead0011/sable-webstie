import type { Metadata } from "next";
import InformationClient from "@/app/information/InformationClient";

export const metadata: Metadata = {
  title: "Information | sable",
  description: "Offline store, returns and exchanges, terms of service, and privacy policy."
};

export default function InformationPage() {
  return <InformationClient />;
}
