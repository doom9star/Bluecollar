import { PrivateRoute } from "../../../components/Route";
import { MeDocument, MeQuery, Job, User } from "../../../graphql/generated";
import Image from "next/image";
import useReadQuery from "../../../hooks/useReadQuery";
import JobCard from "../../../components/JobCard";
import { useMemo } from "react";

function Profile() {
  const user = useReadQuery<MeQuery>(MeDocument)?.me.user;
  const joined = useMemo(() => {
    if (!user?.createdAt) return "";
    const date = new Date(user.createdAt);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }, [user]);
  const activeJobs = useMemo(() => {
    if (!user?.jobs) return [];
    return user.jobs.filter((j) => j.available);
  }, []);
  const inactiveJobs = useMemo(() => {
    if (!user?.jobs) return [];
    return user.jobs.filter((j) => !j.available);
  }, []);
  return (
    <PrivateRoute>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image src={"/noAvatar.jpg"} alt="avatar" width={150} height={150} />
        <p style={{ fontFamily: "fantasy" }}>@{user?.name}</p>
        <div style={{ width: "100%" }}>
          <p>{user?.gender}</p>
          <p>{user?.email}</p>
          <p>{joined}</p>
          <p>{user?.location}</p>
          <p>{user?.description}</p>
        </div>
      </div>
      {activeJobs.length > 0 && (
        <div style={{ margin: "1rem 0rem" }}>
          <h2>Active Jobs</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 240px))",
              gridGap: "40px",
            }}
          >
            {activeJobs.map((j) => (
              <JobCard key={j.id} job={j as Job} worker={user as User} />
            ))}
          </div>
        </div>
      )}
      {inactiveJobs.length > 0 && (
        <div style={{ margin: "1rem 0rem" }}>
          <h2>Inactive Jobs</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 240px))",
              gridGap: "40px",
            }}
          >
            {inactiveJobs.map((j) => (
              <JobCard key={j.id} job={j as Job} worker={user as User} />
            ))}
          </div>
        </div>
      )}
    </PrivateRoute>
  );
}

export default Profile;
