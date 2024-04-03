// import LoginFormTest from "@/components/LoginFormTest";
import UserCardCC from "@/components/UserCardCC";
import UserCardSC from "@/components/userCardSC";
import UsersSC from "@/components/usersSC";
import TestComponent from "@/components/testComponentCC";
import UpdateProfile from "@/components/UpdateProfileCC";

export default function TestPage() {
  return (
    <div>
      <h1>this is the testing page</h1>
      {/* works - so far */}
      {/* <UsersSC /> */}

      {/* <LoginFormTest /> */}

      {/* not working */}
      {/* <UserCardCC /> */}

      {/* not working */}
      {/* <UserCardSC /> */}
      <TestComponent />
      {/* <UsersSC /> */}
      {/* <UpdateProfile /> */}
    </div>
  );
}
