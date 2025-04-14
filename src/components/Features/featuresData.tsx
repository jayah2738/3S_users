import { Feature } from "@/types/feature";
import { FaHouseFlag,FaFlagUsa,FaComputer }  from "react-icons/fa6";
import { GiBlackFlag } from "react-icons/gi";
import { LuScreenShare } from "react-icons/lu";
import { ImBooks } from "react-icons/im";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <FaHouseFlag size={50} color="green"/>
    ),
    title: "Malagasy Language",
    paragraph:
      "As we follow the programs of the Malagsy ministry of education, we teach the Malagasy language in all its aspects. We teach the language, the culture, and the history of Madagascar. We also teach the history of the Malagasy language and its evolution. ",
  },
  {
    id: 1,
    icon: (
     <FaFlagUsa size={50} color="red"/>
    ),
    title: "English Language",
    paragraph:
      "We are opened to everyone whether you are a Malagasy or a foreigner that's why we use the English language as a communication language at school.",
  },
  {
    id: 1,
    icon: (
      <GiBlackFlag size={50} color="blue"/>

    ),
    title: "French Language",
    paragraph:
      "We are opened to everyone whether you are a Malagasy or a foreigner that's why we use the French language as a communication language at school.",
  },
  {
    id: 1,
    icon: (
      <FaComputer size={50} color=""/>

    ),
    title: "Computer Science",
    paragraph:
      "As a modern school,, we teach computer science to students from grade 1 to 12th grade because nowadays everything you see around is made by the technology so we don't want our students are late for their best future skills",
  },
  {
    id: 1,
    icon: (
      <LuScreenShare size={50} color=""/>
    ),
    title: "A giant screen",
    paragraph:
      "We have a giant screen in the classroom to make the class more interactive and more fun. We use it to show videos, slides, and other materials that can help students understand better.",
  },
  {
    id: 1,
    icon: (
      <ImBooks size={50} color=""/>

    ),
    title: "Library",
    paragraph:
      "We have a library with a lot of books that can help students to learn more about the world. We have books in Malagasy, English, and French. We also have a lot of magazines and newspapers.",
  },
];
export default featuresData;
