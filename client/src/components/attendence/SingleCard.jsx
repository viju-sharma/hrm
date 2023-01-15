import { Grid, Segment, Button, Image, Header } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { isChanged } from "../../features/attendence-slice";
import { privateRequest } from "../../utils/requestMethod";

const SingleCard = (props) => {
  const dispatch = useDispatch();

  const removeLeave = () => {
    privateRequest
      .post("/api/employee/removeLeave", {
        emp_Id: props.emp_Id,
      })
      .then((result) => {
        dispatch(isChanged());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fullName = props.fullName;
  return (
    <Grid.Column>
      <Segment color={props.absent ? "red" : "green"} raised>
        <Grid textAlign="center" verticalAlign="middle" columns={3}>
          <Grid.Column width={4}>
            <div style={{ width: "4rem", height: "4rem", margin: "auto" }}>
              <Image
                centered
                circular
                className="coverImg"
                src={props.profileImg}
              />
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header content={fullName} subheader="2134434" />
          </Grid.Column>
          <Grid.Column width={3}>
            {props.absent && (
              <Button
                compact
                color="red"
                onClick={removeLeave}
                icon="frown outline"
                circular
              />
            )}
            {!props.absent && (
              <Button
                compact
                color="green"
                onClick={props.addLeave}
                icon="smile outline"
                circular
              />
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};
export default SingleCard;
