import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../api";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [gotVerified, setGotVerified] = useState(false);
  const verificationCode = searchParams.get('verificationCode');

  useEffect(() => {
    verifyEmail(verificationCode)
      .then(() => {
        setGotVerified(true);
        setLoading(false);
      })
      .catch(() => {
        setGotVerified(false);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Flex justify="center" align="center" mt={20}>
    {console.log("IN VERIFY CODE", verificationCode)}

      <Spinner speed="0.6s" thickness="4px" colorScheme="green" size="xl" />
    </Flex>
  ) : (
    <>
    <Flex justify="center" align="center" mt={20}>
      {(gotVerified === false ? 

        <Alert status="error">
          <AlertIcon />
          <AlertTitle >Email Verification Failed</AlertTitle>
          <AlertDescription>Your email verification failed.</AlertDescription>
        </Alert> : 
      <Alert status="success">
        <AlertIcon />
        <AlertTitle >Email Verified</AlertTitle>
        <AlertDescription>Your email has been verified successfully.</AlertDescription>
      </Alert>
      )}
      
    </Flex>
      
    </>
  );
}