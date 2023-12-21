import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AlertWrapper = ({ icon, title, description, variant = undefined }) => (
  <Alert variant={variant}>
    {icon}
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{description}</AlertDescription>
  </Alert>
);

export default AlertWrapper;
