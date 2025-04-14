import InfoParents from "@/components/Infos/InfoParents";
import InfoStudents from "@/components/Infos/InfoStudents";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "informations"
  
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Information Pages"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <InfoParents />
      <InfoStudents />
    </>
  );
};

export default AboutPage;
