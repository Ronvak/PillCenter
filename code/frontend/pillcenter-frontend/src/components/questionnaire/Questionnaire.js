import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import MyButton from "../buttons/ButtonTemplate";

export default function Questionnaire(props) {
  const { handleQuestionnaire } = props;
  const [questions, setQuestions] = React.useState({
    question1: "",
    question1Details: "",
    question2: "",
    question2Details: "",
    question3: "",
    question3Details: "",
    question4: "",
    question4Details: "",
    question5: "",
    question5Details: "",
    question6: "",
    question6Details: "",
    question7: "",
    question7Details: "",
    question8: "",
    question8Details: "",
    question9: "",
    question9Details: "",
    question10: "",
    question10Details: "",
    question11: "",
    question11Details: "",
  });

  const handleQuestionChange = (event) => {
    setQuestions({ ...questions, [event.target.name]: event.target.value });
    if (event.target.name === "question1") {
      setQuestions({
        ...questions,
        question1: event.target.value,
        question1Details: "",
      });
    } else {
      // Handle changes to other questions here
    }
  };

  return (
    <center>
      <br></br>
      <br></br>
      <Box sx={{ width: "80%" }}>
        <Typography variant="h6" component="h2" gutterBottom>
          שאלון רפואי
        </Typography>
        <FormControl component="fieldset">
          <FormGroup>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <Grid item={true} xs={25} sm={20}>
                <FormControl component="fieldset" sx={{ textAlign: "left" }}>
                  <RadioGroup
                    aria-label="question1"
                    name="question1"
                    row
                    value={questions.question1}
                    onChange={handleQuestionChange}
                  >
                    האם יש לך מצב רפואי קיים?&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                    <FormControlLabel
                      value="כן"
                      control={<Radio />}
                      label="כן"
                    />
                    <FormControlLabel
                      value="לא"
                      control={<Radio />}
                      label="לא"
                    />
                  </RadioGroup>
                  {questions.question1 === "כן" && (
                    <TextField
                      id="standard-basic"
                      label="פרטים נוספים על מצב הבריאותי שלך"
                      name="question1Details"
                      value={questions.question1Details}
                      onChange={handleQuestionChange}
                      sx={{ m: 1, width: "98%", height: "10%" }}
                    />
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <Grid item={true} xs={25} sm={20}>
                <FormControl component="fieldset" sx={{ textAlign: "left" }}>
                  <RadioGroup
                    aria-label="question2"
                    name="question2"
                    row
                    value={questions.question2}
                    onChange={handleQuestionChange}
                  >
                    האם אי פעם אובחנת עם מחלות קשות או עברת ניתוחים כלשהם?
                    <FormControlLabel
                      value="כן"
                      control={<Radio />}
                      label="כן"
                    />
                    <FormControlLabel
                      value="לא"
                      control={<Radio />}
                      label="לא"
                    />
                  </RadioGroup>
                  {questions.question2 === "כן" && (
                    <TextField
                      id="standard-basic"
                      label="אנא ציין באלו מחלות\ניתוחים מדובר"
                      name="question2Details"
                      value={questions.question2Details}
                      onChange={handleQuestionChange}
                      sx={{ m: 1, width: "98%", height: "10%" }}
                    />
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <Grid item={true} xs={25} sm={20}>
                <FormControl component="fieldset" sx={{ textAlign: "left" }}>
                  <RadioGroup
                    aria-label="question3"
                    name="question3"
                    row
                    value={questions.question3}
                    onChange={handleQuestionChange}
                  >
                    האם יש לך אלרגיות ידועות לתרופות או לחומרים אחרים?
                    <FormControlLabel
                      value="כן"
                      control={<Radio />}
                      label="כן"
                    />
                    <FormControlLabel
                      value="לא"
                      control={<Radio />}
                      label="לא"
                    />
                  </RadioGroup>
                  {questions.question3 === "כן" && (
                    <TextField
                      id="standard-basic"
                      label="אנא ציין באלו אלרגיות\חומרים מדובר"
                      name="question3Details"
                      value={questions.question3Details}
                      onChange={handleQuestionChange}
                      sx={{ m: 1, width: "98%", height: "10%" }}
                    />
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <Grid item={true} xs={25} sm={20}>
                <FormControl component="fieldset" sx={{ textAlign: "left" }}>
                  <RadioGroup
                    aria-label="question4"
                    name="question4"
                    row
                    value={questions.question4}
                    onChange={handleQuestionChange}
                  >
                    האם נטלת בעבר או כרגע אתה נוטל תרופות מרשם כלשהן?
                    <FormControlLabel
                      value="כן"
                      control={<Radio />}
                      label="כן"
                    />
                    <FormControlLabel
                      value="לא"
                      control={<Radio />}
                      label="לא"
                    />
                  </RadioGroup>
                  {questions.question4 === "כן" && (
                    <TextField
                      id="standard-basic"
                      label="אנא ציין את שם התרופה,המינון והתדירות"
                      name="question4Details"
                      value={questions.question4Details}
                      onChange={handleQuestionChange}
                      sx={{ m: 1, width: "100%", height: "10%" }}
                    />
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <Grid item={true} xs={25} sm={20}>
                <FormControl component="fieldset" sx={{ textAlign: "left" }}>
                  <RadioGroup
                    aria-label="question5"
                    name="question5"
                    row
                    value={questions.question5}
                    onChange={handleQuestionChange}
                  >
                    האם אתה נוטל תרופות ללא מרשם או תוספי תזונה?
                    <FormControlLabel
                      value="כן"
                      control={<Radio />}
                      label="כן"
                    />
                    <FormControlLabel
                      value="לא"
                      control={<Radio />}
                      label="לא"
                    />
                  </RadioGroup>
                  {questions.question5 === "כן" && (
                    <TextField
                      id="standard-basic"
                      label="נא לציין איזה תרופות\תוספי תזונה"
                      name="question5Details"
                      value={questions.question5Details}
                      onChange={handleQuestionChange}
                      sx={{ m: 1, width: "98%", height: "10%" }}
                    />
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <Grid item={true} xs={25} sm={20}>
                <FormControl component="fieldset" sx={{ textAlign: "left" }}>
                  <RadioGroup
                    aria-label="question6"
                    name="question6"
                    row
                    value={questions.question6}
                    onChange={handleQuestionChange}
                  >
                    האם יש לך מצבים רפואיים כגון הריון,הנקה,מחלת כבד או
                    כליות,מחלת לב שעלולה להצביע נגד שימוש בתרופות מסוימות?
                    <FormControlLabel
                      value="כן"
                      control={<Radio />}
                      label="כן"
                    />
                    <FormControlLabel
                      value="לא"
                      control={<Radio />}
                      label="לא"
                    />
                  </RadioGroup>
                  {questions.question6 === "כן" && (
                    <TextField
                      id="standard-basic"
                      label="נא לציין את המצבים הרפואיים"
                      name="question6Details"
                      value={questions.question6Details}
                      onChange={handleQuestionChange}
                      sx={{ m: 1, width: "98%", height: "10%" }}
                    />
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <Grid item={true} xs={25} sm={20}>
                <FormControl component="fieldset" sx={{ textAlign: "left" }}>
                  <RadioGroup
                    aria-label="question7"
                    name="question7"
                    row
                    value={questions.question7}
                    onChange={handleQuestionChange}
                  >
                    האם אתה נוטל כרגע תרופות,תוספי מזון או תרופות צמחיות אחרות?
                    <FormControlLabel
                      value="כן"
                      control={<Radio />}
                      label="כן"
                    />
                    <FormControlLabel
                      value="לא"
                      control={<Radio />}
                      label="לא"
                    />
                  </RadioGroup>
                  {questions.question7 === "כן" && (
                    <TextField
                      id="standard-basic"
                      label=" אם כן אנא ציין כאן"
                      name="question7Details"
                      value={questions.question7Details}
                      onChange={handleQuestionChange}
                      sx={{ m: 1, width: "98%", height: "10%" }}
                    />
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <Grid item={true} xs={25} sm={20}>
                <FormControl component="fieldset" sx={{ textAlign: "left" }}>
                  <RadioGroup
                    aria-label="question8"
                    name="question8"
                    row
                    value={questions.question8}
                    onChange={handleQuestionChange}
                  >
                    האם יש לך מרשם תקף מספק שירותי בריאות מורשה עבור התרופה שאתה
                    מנסה לרכוש?
                    <FormControlLabel
                      value="כן"
                      control={<Radio />}
                      label="כן"
                    />
                    <FormControlLabel
                      value="לא"
                      control={<Radio />}
                      label="לא"
                    />
                  </RadioGroup>
                  {questions.question8 === "כן" && (
                    <TextField
                      id="standard-basic"
                      label="ציין את שם הרופא הרושם,פרטי התקשרות ותאריך "
                      name="question8Details"
                      value={questions.question8Details}
                      onChange={handleQuestionChange}
                      sx={{ m: 1, width: "102%", height: "10%" }}
                    />
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <Grid item={true} xs={25} sm={20}>
                <FormControl component="fieldset" sx={{ textAlign: "left" }}>
                  <RadioGroup
                    aria-label="question9"
                    name="question9"
                    row
                    value={questions.question9}
                    onChange={handleQuestionChange}
                  >
                    האם הנך בגיל 16 ומעלה כנדרש בחוק לצורך רכישת תרופות?
                    <FormControlLabel
                      value="כן"
                      control={<Radio />}
                      label="כן"
                    />
                    <FormControlLabel
                      value="לא"
                      control={<Radio />}
                      label="לא"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <Grid item={true} xs={25} sm={20}>
                <FormControl component="fieldset" sx={{ textAlign: "left" }}>
                  <RadioGroup
                    aria-label="question10"
                    name="question10"
                    row
                    value={questions.question10}
                    onChange={handleQuestionChange}
                  >
                    האם ברצונך לרכוש את התרופה לשימוש עצמי ולא למכירה חוזרת או
                    הפצה?
                    <FormControlLabel
                      value="כן"
                      control={<Radio />}
                      label="כן"
                    />
                    <FormControlLabel
                      value="לא"
                      control={<Radio />}
                      label="לא"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" sx={{ textAlign: "left" }}>
                  <RadioGroup
                    aria-label="question11"
                    name="question11"
                    row
                    value={questions.question10}
                    onChange={handleQuestionChange}
                  >
                    לאלו תסמינים או מצבים אתה מחפש טיפול? נא לתאר אותם
                    בפירוט,כולל משך הזמן והחומרה:
                    <TextField
                      id="standard-basic"
                      sx={{ m: 1, width: "98%", height: "10%" }}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <center>
              <MyButton onClick={handleQuestionnaire} sx={{ width: "60%" }}>
                סיום מילוי שאלון
              </MyButton>
            </center>
          </FormGroup>
        </FormControl>
      </Box>
    </center>
  );
}
