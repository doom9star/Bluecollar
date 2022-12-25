import { ArrowLeftOutlined, RadarChartOutlined } from "@ant-design/icons";
import { Spin, Badge, Table, Button, Calendar } from "antd";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { PrivateRoute } from "../../../../components/Route";
import { useGetJobQuery } from "../../../../graphql/generated";
import { Leagues } from "../../../../graphql/types";
import { getTime } from "../../../../utils";

enum Screen {
  JOB_SCREEN,
  BOOKING_SCREEN,
}

function Job() {
  const router = useRouter();
  const jobId = router.query.jobId as string;
  const { data, loading } = useGetJobQuery({ variables: { id: jobId } });
  const job = data?.getJob.job;

  const [screen, setScreen] = useState<Screen>(Screen.JOB_SCREEN);

  const leagueColor = useMemo(() => {
    if (!job) return "";
    return Leagues[job.league].color;
  }, [job]);

  if (loading)
    return (
      <Spin
        style={{ position: "absolute", top: "50%", left: "50%" }}
        size="large"
      />
    );

  if (!job) {
    router.back();
    return null;
  }

  return (
    <PrivateRoute>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <ArrowLeftOutlined
            onClick={() =>
              screen === Screen.BOOKING_SCREEN
                ? setScreen(Screen.JOB_SCREEN)
                : router.back()
            }
            style={{ cursor: "pointer", paddingRight: "1rem" }}
          />
          {screen === Screen.JOB_SCREEN && (
            <Button
              style={{
                color: "white",
                backgroundColor: leagueColor,
              }}
              onClick={() => setScreen(Screen.BOOKING_SCREEN)}
            >
              Book
            </Button>
          )}
        </div>
        {screen === Screen.JOB_SCREEN ? (
          <>
            <div style={{ alignSelf: "center" }}>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "2rem",
                  margin: "0.5rem",
                }}
              >
                <RadarChartOutlined style={{ color: leagueColor }} />
              </p>
              <Badge
                size="default"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  fontFamily: "fantasy",
                }}
                count={job.points}
                showZero={true}
              >
                <NextImage
                  src={"/noAvatar.jpg"}
                  alt="avatar"
                  width={150}
                  height={150}
                />
              </Badge>
              <p
                style={{
                  fontFamily: "fantasy",
                  fontSize: "2rem",
                  textAlign: "center",
                }}
              >
                @{job.user.name}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <h3>Type</h3>
              <p>{job.type}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <h3>Gender</h3>
              <p>{job.user.gender}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <h3>Experience (years)</h3>
              <p>{job.experience}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <h3>Working Hours</h3>
              <p>
                {getTime(job.start)} &nbsp;---&nbsp; {getTime(job.end)}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <h3>Contact</h3>
              <p>{job.contact}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <h3>Address</h3>
              <p>{job.address}</p>
            </div>
            {job.sampleCharges && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <h3>Sample Charges (₹)</h3>
                <Table
                  columns={[
                    {
                      title: "Sample",
                      dataIndex: "sample",
                    },
                    {
                      title: "₹ Charge",
                      dataIndex: "charge",
                    },
                  ]}
                  dataSource={JSON.parse(job.sampleCharges).map((sc: any) => ({
                    sample: sc.sample,
                    charge: sc.charge,
                  }))}
                  pagination={false}
                  style={{ border: "1px solid rgb(230, 230, 230)" }}
                />
              </div>
            )}
            {job.extraInfo && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <h3>Extra Information</h3>
                <p>{job.extraInfo}</p>
              </div>
            )}
          </>
        ) : (
          <div>
            <h1>Book {job.user.name}</h1>
            <h3 style={{ opacity: 0.6 }}>{job.type}</h3>
            <Calendar
            // dateCellRender={(d) => {
            //   return <div>{}</div>;
            // }}
            />
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}

export default Job;
