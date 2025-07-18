import { Select, Icon, Popover, Button, ActionList } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { CalendarIcon } from "@shopify/polaris-icons";
import { monthsOptions, timeOptions } from "app/libs/constant";

export function TimeLineSelector1() {
  const [selectedMonth, setSelectedMonth] = useState("month");

  const handleSelectChange = useCallback((value: string) => {
    setSelectedMonth(value);
  }, []);

  return (
    <Select
      label={<Icon source={CalendarIcon} />}
      labelInline
      options={timeOptions}
      onChange={handleSelectChange}
      value={selectedMonth}
    ></Select>
  );
}

// Popover not working in modal
export function TimeLineSelector2() {
  const [popoverActive, setPopoverActive] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Month");

  const togglePopoverActive = useCallback(
    () => setPopoverActive((active) => !active),
    [],
  );

  const handleMonthSelect = useCallback((month: string) => {
    setSelectedMonth(month);
    setPopoverActive(false);
  }, []);

  return (
    <Popover
      active={popoverActive}
      zIndexOverride={5100}
      activator={
        <Button
          onClick={togglePopoverActive}
          icon={CalendarIcon}
          disclosure
          size="slim"
        >
          {selectedMonth}
        </Button>
      }
      onClose={togglePopoverActive}
      preferredPosition="below"
      preferredAlignment="right"
    >
      <ActionList
        items={monthsOptions.map((month) => ({
          content: month,
          onAction: () => handleMonthSelect(month),
        }))}
      />
    </Popover>
  );
}
