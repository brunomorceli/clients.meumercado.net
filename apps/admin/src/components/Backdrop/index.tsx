import { Spin } from '../Spin';
import { BackdropModal } from './styles';

type BackdropProps = {
  title?: string;
  open?: boolean;
};

export function Backdrop(props: BackdropProps) {
  return (
    <BackdropModal
      open={props.open}
      footer={null}
      title={null}
      closable={false}
    >
      <Spin
        title={props.title}
        spinStyle={{ color: 'white' }}
        textStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}
      />
    </BackdropModal>
  );
}
