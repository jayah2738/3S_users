import InfoParents from "@/components/Infos/InfoParents";
import InfoStudents from "@/components/Infos/InfoStudents";
import ScrollUp from "@/components/Common/ScrollUp";
import Questions from "@/components/Questions";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ExtraCurricular from "@/components/Extracurricular";
import Video from "@/components/Video";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SamSriah School's Courses",
  description: "SamSriah School"
};

export default function Home() {
  
  return (
    <>
      <Header />
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <InfoParents />
      <InfoStudents />
      <ExtraCurricular />
      <Questions />
      <Footer />
    </>
  );
}
// rest api
// ajax