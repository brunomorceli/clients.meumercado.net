import PagePreviousIcon from "@rsuite/icons/PagePrevious";

interface PanelBaseProps {
  title: string;
  onBack?: () => void;
}

export function TitleBase(props: PanelBaseProps) {
  const { title, onBack } = props;
  return (
    <h3
      onClick={onBack}
      style={{
        cursor: Boolean(onBack) ? "pointer" : "default",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      {onBack && (
        <>
          <PagePreviousIcon />
          &nbsp;
        </>
      )}
      {title}
    </h3>
  );
}
