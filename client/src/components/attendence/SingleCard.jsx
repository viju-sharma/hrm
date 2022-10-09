import { Grid, Segment, Button, Image, Header } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { isChanged } from "../../features/attendence-slice";
import { privateRequest } from "../../utils/requestMethod";

const SingleCard = (props) => {
  const dispatch = useDispatch();

  const removeLeave = () => {
    privateRequest
      .post("/employee/removeLeave", {
        emp_Id: props.emp_Id,
      })
      .then((result) => {
        dispatch(isChanged());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const firstName = props.firstName;
  return (
    <Grid.Column>
      <Segment color={props.absent ? "red" : "green"} raised>
        <Grid verticalAlign="middle" columns={3} stackable>
          <Grid.Column>
            <Image centered circular size="tiny" src="/images/rachel.png" />
          </Grid.Column>
          <Grid.Column>
            <Header content={firstName} subheader="2134434" />
          </Grid.Column>
          <Grid.Column>
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
