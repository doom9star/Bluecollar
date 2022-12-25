import { RadarChartOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { Button, Menu, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import JobCard from "../../components/JobCard";
import { PrivateRoute } from "../../components/Route";
import { Job, useGetJobByTypeQuery } from "../../graphql/generated";
import { JobType } from "../../graphql/types";
import useNavigator from "../../hooks/useNavigator";
import { Leagues } from "../../graphql/types";
import { captialize } from "../../utils";

function Home() {
  const router = useRouter();
  const { path } = useNavigator();
  const type = !router.query.type ? "All" : (router.query.type as string);
  const { data, loading } = useGetJobByTypeQuery({
    variables: { type },
    fetchPolicy: "no-cache",
  });

  const jobs = data?.getJobByType.jobs;

  const jobsByLeague = useMemo(() => {
    let _: Map<string, Job[]> = new Map();
    if (!jobs) return _;
    _ = jobs.reduce<typeof _>((p, c) => {
      p.set(c.league, p.get(c.league) ? [...p.get(c.league)!, c as any] : [c]);
      return p;
    }, new Map());
    return _;
  }, [jobs]);

  return (
    <PrivateRoute>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ marginRight: "1rem" }}>Wanna Work? </span>
        <Link href={`${path}/job/create`}>
          <a>
            <Button type="primary">Create Job</Button>
          </a>
        </Link>
      </div>
      <div style={{ display: "flex" }}>
        <Menu
          style={{ width: "20%", padding: "1rem" }}
          mode="vertical"
          defaultSelectedKeys={[!type ? "ALL" : type.toUpperCase()]}
        >
          <Menu.Item onClick={() => router.push(`/home`)} key="ALL">
            All
          </Menu.Item>
          {Object.keys(JobType).map((t) => {
            const captialized = captialize(t);
            return (
              <Menu.Item
                onClick={() => router.push(`/home?type=${captialized}`)}
                key={t}
              >
                {captialized}
              </Menu.Item>
            );
          })}
        </Menu>
        <div
          style={{
            width: "80%",
            position: "relative",
            minHeight: "400px",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: jobs && jobs.length === 0 ? "center" : undefined,
          }}
        >
          {loading ? (
            <Spin
              style={{ position: "absolute", top: "100%", left: "50%" }}
              size="large"
            />
          ) : jobs && jobs.length > 0 ? (
            Array.from(jobsByLeague, ([l, jbs]) => (
              <div key={l}>
                <h3>
                  <RadarChartOutlined
                    style={{ color: Leagues[l].color, fontSize: "1.5rem" }}
                  />{" "}
                  {captialize(l)} League
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(200px, 240px))",
                    gridGap: "40px",
                  }}
                >
                  {jbs.map((j) => (
                    <JobCard key={j.id} job={j as Job} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UserDeleteOutlined />
              <p>Sorry for inconveneince!</p>
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}

export default Home;
