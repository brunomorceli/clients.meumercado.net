import { Confirm } from "src/modules/admins/components/Confirm";
import { useParams } from "react-router";

export default function CredentialsConfirmPage() {
  const { id } = useParams();

  return <Confirm authId={id as string} />;
}

export class CredentialsConfirmHandler {
  static route(): string {
    return '/admins/credentials/confirm/:id';
  }
  static navigate(id: string): string {
    return '/admins/credentials/confirm/:id'.replace(':id', id);
  }
}
