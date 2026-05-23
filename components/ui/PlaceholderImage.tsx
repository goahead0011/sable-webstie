import styles from "@/components/ui/PlaceholderImage.module.css";

type PlaceholderImageProps = {
  tone?: "light" | "medium";
  label?: string;
  className?: string;
};

export default function PlaceholderImage({ tone = "medium", label = "", className = "" }: PlaceholderImageProps) {
  return (
    <div className={`${styles.placeholder} ${styles[tone]} ${className}`} role="img" aria-label={label || "Image placeholder"} />
  );
}
