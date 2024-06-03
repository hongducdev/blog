import Github from "@/components/icons/Github";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

interface Social {
  id: number;
  name: string;
  link: string;
  icon: React.ReactNode;
}

const socials: Social[] = [
  {
    id: 1,
    name: "Github",
    link: "https://github.com/hongducdev",
    icon: <Github className="w-9 h-9" />,
  },
];

const Social = () => {
  return (
    <div>
      {socials.map((social) => (
        <div key={social.id}>
          <AnimatedTooltip
            items={[
              {
                id: social.id,
                name: social.name,
              },
            ]}
          >
            <a href={social.link} target="_blank" rel="noreferrer">
              {social.icon}
            </a>
          </AnimatedTooltip>
        </div>
      ))}
    </div>
  );
};

export default Social;
