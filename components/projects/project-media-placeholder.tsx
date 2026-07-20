interface ProjectMediaPlaceholderProps {
  projectName: string;
}

export function ProjectMediaPlaceholder({
  projectName,
}: ProjectMediaPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className="project-media-placeholder"
      data-project-media-placeholder
    >
      {/* Future asset: public/projects/<slug>/product-overview.webp. Replace this placeholder and add specific, meaningful alt text when the project-safe image is available. */}
      <div className="project-media-grid" />
      <p className="project-media-label">
        <span>{projectName}</span>
        Product media coming later
      </p>
    </div>
  );
}
