import { jsPDF } from "jspdf";
import moment from "moment-jalaali";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { ReduxStateI } from "../redux";
import { EventI } from "../redux/reducers/events/events";
import { UserI } from "../redux/reducers/user/user";
import {
  convertAMPMtoPersia,
  convertEnglishWeekdaysToPersian,
  convertFinglishMonthToPersian,
  convertMinutesToHours,
} from "../utils/helpers";
import png from "./calendarPDF.png";
require("../styles/vazir-font-v16.1.0/Vazir-Medium-normal.js");

const ELangRegex = /[a-zA-z]/;

const pElementTagRegex = /(<p>|<\/p>)/g;

export default function usePdf(event: EventI) {
  const doc = useMemo(() => new jsPDF(), []);

  const user = useSelector<ReduxStateI, UserI>(state => state.user.user);
  const splitTitle = useMemo(
    () => doc.splitTextToSize(event.title, 96),
    [doc, event.title]
  );

  const time = useMemo(
    () =>
      `${convertAMPMtoPersia(
        convertMinutesToHours(event.endTime + event.startTime)
      )} ${convertAMPMtoPersia(convertMinutesToHours(event.startTime))}`,
    [event.endTime, event.startTime]
  );

  const date = useMemo(() => {
    const m = moment(event.timeStamp);
    const monthName = convertFinglishMonthToPersian(m.format("jMMMM"));
    const day = m.jDate();
    const year = m.jYear();
    const weekDay = convertEnglishWeekdaysToPersian(
      m.format("dddd").toLowerCase() as any
    );
    return `${year} ${weekDay} ${day} ${monthName}`;
  }, [event.timeStamp]);

  const description = useMemo(
    () =>
      doc.splitTextToSize(event.description.replace(pElementTagRegex, ""), 283),
    [doc, event.description]
  );
  const isDescriptionEnglish = useMemo(
    () => ELangRegex.test(description),
    [description]
  );
  const isTitleEnglish = useMemo(
    () => ELangRegex.test(event.title),
    [event.title]
  );

  const createAndSavePdf = useCallback(() => {
    doc.setFillColor(104, 104, 104);
    doc.setFont("Vazir-Medium");
    doc.addImage(png, "png", 170, 25, 30, 30);
    doc.rect(10, 10, 190, 7, "F");
    doc.setTextColor("white");
    doc.setFontSize(10);
    doc.text(user.email, 13, 14.5);
    doc.setFontSize(25);
    doc.setTextColor("black");
    doc.setFontSize(12);
    doc.text(splitTitle, isTitleEnglish ? 10 : 150, 34, {
      align: isTitleEnglish ? "left" : "right",
    });
    doc.setTextColor("gray");
    doc.text("زمان", 199, 70, { align: "right" });
    doc.setTextColor("black");
    doc.setFontSize(15);
    doc.text(time, 150, 78);
    doc.setTextColor("gray");
    doc.setFontSize(10);
    doc.text("تاریخ", 199, 90, { align: "right" });
    doc.setTextColor("black");
    doc.setFontSize(15);
    doc.text(date, 148, 100);
    doc.setTextColor("gray");
    doc.setFontSize(10);
    doc.text("یادداشت های من", 199, 110, { align: "right" });
    doc.text(description, isDescriptionEnglish ? 10 : 199, 120, {
      align: isDescriptionEnglish ? "left" : "right",
    });

    doc.save("چاپ-رویداد");
  }, [
    date,
    description,
    doc,
    isDescriptionEnglish,
    isTitleEnglish,
    splitTitle,
    time,
    user.email,
  ]);

  return { createAndSavePdf };
}
