// ============================================================================ >> imports <<
//
// ------------------------------------------------------------ >> Convertor <<
import {
  EnToFa,
  addLeadingZero,
  FaToEn,
} from "./../Perisian_Convertor/perisan_convertor.js";
// ------------------------------------------------------------ >> Convertor <<
//
// ============================================================================ >> imports <<
//
// ======================================================================== >> Definitions <<

// DP => { DatePicker }

// EL => { Event Listener }

// AP => { AppendChild }

// ======================================================================== >> Definitions <<
//
// ======================================================================== >> date picker <<
export function DatePicker(LabelText, SelectedDate) {
  //
  // ------------------------------------------------------------- >> DP <<
  const DatePicker = document.createElement("div");
  DatePicker.classList.add("DatePicker");
  // ------------------------------------------------------------- >> DP <<
  //
  // ------------------------------------------------------- >> DP Label <<
  const Label = document.createElement("span");
  Label.classList.add("DatePickerLabel");
  //
  // --------------------------------------- > TextContent <
  Label.textContent = LabelText;
  // --------------------------------------- > TextContent <
  //
  // ------------------------------------------------ > AP <
  DatePicker.appendChild(Label);
  // ------------------------------------------------ > AP <
  //
  // ------------------------------------------------------- >> DP Label <<
  //
  // ------------------------------------------------------- >> DP Title <<
  const DatePickerTitle = document.createElement("div");
  DatePickerTitle.classList.add("DatePickerTitle");
  //
  // ----------------------------------- > EL <
  DatePickerTitle.addEventListener("click", () => {
    //
    // Class Managment >>
    DatePicker.classList.toggle("big");
    DatePickerBody.classList.toggle("show");
    DatePickerTitleIcon.classList.toggle("turn");
    DatePickerBtn.classList.toggle("show");
    // Class Managment <<
    //
  });
  // ----------------------------------- > EL <
  //
  // --------------------------------- > Text <
  const DatePickerTitleText = document.createElement("span");
  DatePickerTitleText.classList.add("DatePickerTitleText");
  DatePickerTitleText.textContent = "انتخاب کنید";
  // --------------------------------- > Text <
  //
  // --------------------------------- > icon <
  const DatePickerTitleIcon = document.createElement("iconify-icon");
  DatePickerTitleIcon.classList.add("DatePickerTitleIcon");
  DatePickerTitleIcon.setAttribute("icon", "iconamoon:arrow-down-2");
  // --------------------------------- > icon <
  //
  // ----------------------------------- > AP <
  DatePickerTitle.appendChild(DatePickerTitleIcon);
  DatePickerTitle.appendChild(DatePickerTitleText);
  DatePicker.appendChild(DatePickerTitle);
  // ----------------------------------- > AP <
  //
  // ------------------------------------------------------- >> DP Title <<
  //
  // -------------------------------------------------------- >> DP Body <<
  const DatePickerBody = document.createElement("div");
  DatePickerBody.classList.add("DatePickerBody");
  //
  // ----------------------------------------------- > Year <
  //
  // ---------------------------------- variables >>
  let SelectedYear = null;
  let IsLeap = false;
  // ---------------------------------- variables <<
  //
  // --------------------------- get current year <<
  const currentGregorianYear = new Date().getFullYear();
  const currentShamsiYear = gregorianToShamsi(currentGregorianYear);
  // --------------------------- get current year <<
  //
  // ----------------------------------- CallBack >>
  const Year = Builder("", false, 1300, currentShamsiYear, function (value) {
    //
    // Fill The Value
    SelectedYear = value;

    // convert the Value to en
    let ConvertedYear = FaToEn(SelectedYear);

    // Is Leap Year Checker
    if (
      (ConvertedYear % 4 === 0 && ConvertedYear % 100 !== 0) ||
      ConvertedYear % 400 === 0
    ) {
      DaysList.appendChild(LastChild);
      IsLeap = true;
    } else {
      IsLeap = false;
      if (DaysList.contains(LastChild)) {
        DaysList.removeChild(LastChild);
      } else {
      }
    }

    // ClassManagement >>
    Month.widget.classList.add("show");
    //
  });

  // add the show class to year
  Year.widget.classList.add("show");

  // ----------------------------------- CallBack <<
  //
  // ----------------------------------------- AP >>
  DatePickerBody.appendChild(Year.widget);
  // ----------------------------------------- AP <<
  //
  // ----------------------------------------------- > Year <
  //
  // ---------------------------------------------- > Month <
  //
  // --------------------------------- variables >>
  const MonthList = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "ابان",
    "اذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  let SelectedMonth = null;
  // --------------------------------- variables <<
  //
  // ---------------------------------- CallBack >>
  const Month = Builder(MonthList, true, 0, 0, function (value) {
    DaysHanddler(value);
  });

  // make the month container bigger
  Month.widget.style.width = "130%";
  // ---------------------------------- CallBack <<
  //
  // ---------------------------------- Function >>
  function DaysHanddler(value) {
    //
    // Fill the Value
    SelectedMonth = value;

    // convert the Value
    let ConvertedMonth = FaToEn(SelectedMonth);

    // check if converted month is in leap or is in the first six month
    if (ConvertedMonth <= 6) {
      DaysList.appendChild(LastChild);
    } else if (ConvertedMonth == 12 && IsLeap) {
      DaysList.appendChild(LastChild);
    } else {
      if (DaysList.contains(LastChild)) {
        DaysList.removeChild(LastChild);
      }
    }

    // StateManagement >>
    Days.widget.classList.add("show");
  }
  // ---------------------------------- Function <<
  //
  // ---------------------------------------- AP >>
  DatePickerBody.appendChild(Month.widget);
  // ---------------------------------------- AP <<
  //
  // ---------------------------------------------- > Month <
  //
  // ----------------------------------------------- > Days <
  //
  // ---------------------------------- variables >>
  let SelectedDay = null;
  // ---------------------------------- variables <<
  //
  // ----------------------------------- CallBack >>
  const Days = Builder("", false, 1, 31, function (value) {
    SelectedDay = value;
  });

  // Create a reference to the list of days from the Days object for easier access
  const DaysList = Days.list;
  const LastChild = Days.list.lastChild;

  // ----------------------------------- CallBack <<
  //
  // ----------------------------------------- AP >>
  DatePickerBody.appendChild(Days.widget);
  // ----------------------------------------- AP <<
  //
  // ----------------------------------------------- > Days <
  //
  // ------------------------------------------------- > AP <
  DatePicker.appendChild(DatePickerBody);
  // ------------------------------------------------- > AP <
  //
  // -------------------------------------------------------- >> DP Body <<
  //
  // ------------------------------------------------------ >> DP Submit <<
  const DatePickerBtn = document.createElement("div");
  DatePickerBtn.classList.add("DatePickerBtn");
  //
  // ----------------------------------------------- > el <
  DatePickerBtn.addEventListener("click", () => {
    //
    // !Valid 👎
    if (SelectedDay == null || SelectedMonth == null || SelectedYear == null) {
      DatePickerBtn.classList.add("error");
      SubmitDatePickerText.textContent = "لطفا همه مقادیر را انتخاب کنید";
    }

    // Valid 👍
    else {
      //
      // state managment
      DatePickerBtn.classList.remove("error");
      DatePickerBtn.classList.remove("show");
      DatePicker.classList.remove("big");
      DatePickerBody.classList.remove("show");
      DatePickerTitleIcon.classList.remove("turn");
      DatePickerBtn.textContent = "ثبت";

      // handle selected value
      const ModifiedDate =
        `${SelectedYear}/` + `${SelectedMonth}/` + `${SelectedDay}`;
      DatePickerTitleText.textContent = ModifiedDate;

      // pass the selected value to outside of module
      SelectedDate(ModifiedDate);
    }
  });
  // ----------------------------------------------- > el <
  //
  // --------------------------------------------- > text <
  const SubmitDatePickerText = document.createElement("span");
  SubmitDatePickerText.classList.add("SubmitDatePickerText");
  SubmitDatePickerText.textContent = "ثبت";
  // --------------------------------------------- > text <
  //
  // ----------------------------------------------- > ap <
  DatePickerBtn.appendChild(SubmitDatePickerText);
  DatePicker.appendChild(DatePickerBtn);
  // ----------------------------------------------- > ap <
  //
  // ------------------------------------------------------ >> DP Submit <<
  //
  // --------------------------------------------------------- >> return <<
  return DatePicker;
  // --------------------------------------------------------- >> return <<
  //
}
// ======================================================================== >> date picker <<
//
// ========================================================================== >> Arrow BTN <<
function ArrowBtn(el, icon) {
  //
  // ---------------------------------------------------- >> btn container <<
  const ArrowBtn = document.createElement("div");
  ArrowBtn.classList.add("ArrowBtn");
  // ---------------------------------------------------- >> btn container <<
  //
  // --------------------------------------------------------------- >> el <<
  ArrowBtn.addEventListener("click", () => {
    el();
  });
  // --------------------------------------------------------------- >> el <<
  //
  // --------------------------------------------------------- >> btn icon <<
  const ArrowIcon = document.createElement("iconify-icon");
  ArrowIcon.setAttribute("icon", `${icon}`);
  ArrowIcon.classList.add("ArrowIcon");
  // --------------------------------------------------------- >> btn icon <<
  //
  // --------------------------------------------------------------- >> ap <<
  ArrowBtn.appendChild(ArrowIcon);
  // --------------------------------------------------------------- >> ap <<
  //
  // ----------------------------------------------------------- >> return <<
  return ArrowBtn;
  // ----------------------------------------------------------- >> return <<
}
// ========================================================================== >> Arrow BTN <<
//
// ======================================================================= >> List Builder <<
function ListBuilder(items, isString, MinNumber, MaxNumber, onValueSelected) {
  //
  // ------------------------------------------------ >> List Container <<
  let ListContainer = document.createElement("div");
  ListContainer.classList.add("DatePickerBodyList");
  // ------------------------------------------------ >> List Container <<
  //
  // ----------------------------------------------------- >> Variabels <<
  let SelectedValue = null;
  let SelectedItemContainer = null;
  // ----------------------------------------------------- >> Variabels <<
  //
  // ---------------------------------------------------- >> Item Click <<
  function handleItemClick(ItemContainer, Span) {
    // get the value >
    SelectedValue = Span;
    // get the value <
    //
    // Reremove the class name >
    if (SelectedItemContainer && SelectedItemContainer !== ItemContainer) {
      SelectedItemContainer.classList.remove("Active");
    }
    // Reremove the class name <
    //
    // update the value >
    SelectedItemContainer = ItemContainer;
    // update the value <
    //
    // CallBack the selected value >
    if (SelectedValue) {
      onValueSelected(SelectedValue);
      ItemContainer.classList.add("Active");
    }
    // CallBack the selected value <
  }
  // ---------------------------------------------------- >> Item Click <<
  //
  // ------------------------------------------------ >> string builder <<
  if (isString) {
    for (let Item = 0; Item < items.length; Item++) {
      //
      //  create container
      const ItemContainer = document.createElement("div");
      ItemContainer.classList.add("ItemContainer");

      // craete span
      const Span = document.createElement("span");
      Span.textContent = items[Item];

      // el
      ItemContainer.addEventListener("click", () => {
        let ConvertedTofa = EnToFa(`${Item + 1}`);
        let FinallIndex = addLeadingZero(`${ConvertedTofa}`);
        handleItemClick(ItemContainer, FinallIndex);
      });

      // ap
      ItemContainer.appendChild(Span);
      ListContainer.appendChild(ItemContainer);
    }
  }
  // ------------------------------------------------ >> string builder <<
  //
  // ------------------------------------------------ >> Number builder <<
  else {
    for (let Number = MinNumber; Number <= MaxNumber; Number++) {
      //
      //  create container
      const ItemContainer = document.createElement("div");
      ItemContainer.classList.add("ItemContainer");

      // craete span
      const Span = document.createElement("span");
      Span.textContent = EnToFa(`${Number}`);

      // el
      ItemContainer.addEventListener("click", () => {
        let SelectedIndex = addLeadingZero(`${Span.innerText}`);
        handleItemClick(ItemContainer, SelectedIndex);
      });

      // ap
      ItemContainer.appendChild(Span);
      ListContainer.appendChild(ItemContainer);
    }
  }
  // ------------------------------------------------ >> Number builder <<
  //
  // -------------------------------------------------------- >> return <<
  return ListContainer;
  // -------------------------------------------------------- >> return <<
  //
}
// ======================================================================= >> List Builder <<
//
// ============================================================================ >> Builder <<
function Builder(list, IsString, MinNumber, MaxNumber, OnValueSelected) {
  //
  // -------------------------------------------------- >> Content Container <<
  const DatePickerContent = document.createElement("div");
  DatePickerContent.classList.add("DatePickerContent");
  // -------------------------------------------------- >> Content Container <<
  //
  // ----------------------------------------------------------- >> arrow up <<
  function Up() {
    List.scrollBy({
      top: -100,
    });
  }
  const ScrollToUp = ArrowBtn(Up, "eva:arrow-up-fill");
  ScrollToUp.id = "ArrowUp";
  // ----------------------------------------------------------- >> arrow up <<
  //
  // ------------------------------------------------------------ >> builder <<
  const List = ListBuilder(
    list,
    IsString,
    MinNumber,
    MaxNumber,
    OnValueSelected
  );
  // ------------------------------------------------------------ >> builder <<
  //
  // --------------------------------------------------------- >> arrow Down <<
  function Down() {
    List.scrollBy({
      top: 100,
    });
  }
  const ScrollToDown = ArrowBtn(Down, "eva:arrow-down-fill");
  ScrollToDown.id = "ArrowDown";
  // --------------------------------------------------------- >> arrow Down <<
  //
  // ----------------------------------------------------------------- >> AP <<
  DatePickerContent.appendChild(ScrollToUp);
  DatePickerContent.appendChild(List);
  DatePickerContent.appendChild(ScrollToDown);
  // ----------------------------------------------------------------- >> AP <<
  //
  // ------------------------------------------------------------- >> return <<
  return {
    widget: DatePickerContent,
    list: List,
  };
  // ------------------------------------------------------------- >> return <<
}
// ============================================================================ >> Builder <<
//
// ============================================================= >> current year convertor <<
function gregorianToShamsi(gregorianYear) {
  const currentDate = new Date();
  const shamsiNewYearDate = new Date(gregorianYear, 2, 21); // March 21 of the current Gregorian year

  // If the current date is before March 21, subtract 622; otherwise, subtract 621
  return gregorianYear - (currentDate < shamsiNewYearDate ? 622 : 621);
}
// ============================================================= >> current year convertor <<
