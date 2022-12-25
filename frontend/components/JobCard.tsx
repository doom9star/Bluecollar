import { RadarChartOutlined } from "@ant-design/icons";
import { Badge, Card } from "antd";
import Image from "next/image";
import React, { useMemo } from "react";
import { Job, User } from "../graphql/generated";
import { Leagues } from "../graphql/types";
import useNavigator from "../hooks/useNavigator";

type Props = {
  job: Job;
  worker?: User;
};

const JobCard: React.FC<Props> = ({ job, worker }) => {
  const { push } = useNavigator();
  const _worker = worker ? worker : job.user;
  return (
    <Badge.Ribbon
      style={{
        opacity: worker ? 1 : 0,
      }}
      color={Leagues[job.league].color}
      text={<RadarChartOutlined />}
    >
      <Card
        style={{
          width: 250,
          border: "1px solid rgb(235, 235, 235)",
          cursor: "pointer",
        }}
        onClick={() => push(`/home/job/${job.id}`)}
        cover={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "1rem",
            }}
          >
            <Image
              src={"/noAvatar.jpg"}
              alt="Avatar"
              width={200}
              height={200}
            />
          </div>
        }
      >
        <Card.Meta title={"@" + _worker.name} description={job.type} />
      </Card>
    </Badge.Ribbon>
  );
};

export default JobCard;
