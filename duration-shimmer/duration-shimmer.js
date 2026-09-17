(() => {
  if (typeof Intl.DurationFormat === "function") {
    return;
  }

  class DurationFormat {
    constructor(locales, options = {}) {
      this.locale = new Intl.NumberFormat(locales)
        .resolvedOptions()
        .locale;

      this.style = options.style || "long";

      this.numberFormat = new Intl.NumberFormat(locales, {
        useGrouping: false,
        maximumFractionDigits: 9
      });
    }

    format(duration) {
      const units = [
        ["years", "year"],
        ["months", "month"],
        ["weeks", "week"],
        ["days", "day"],
        ["hours", "hour"],
        ["minutes", "minute"],
        ["seconds", "second"],
        ["milliseconds", "millisecond"]
      ];

      const result = [];

      for (const [property, singular] of units) {
        const value = duration[property];

        if (value === undefined || value === 0) {
          continue;
        }

        if (typeof value !== "number" || !Number.isFinite(value)) {
          throw new RangeError(`Invalid duration value: ${property}`);
        }

        const number = this.numberFormat.format(value);
        let unit = singular;

        if (this.style === "short") {
          unit = {
            year: "yr",
            month: "mo",
            week: "wk",
            day: "day",
            hour: "hr",
            minute: "min",
            second: "sec",
            millisecond: "ms"
          }[singular];
        }

        if (this.style === "long" && Math.abs(value) !== 1) {
          unit += "s";
        }

        result.push(`${number} ${unit}`);
      }

      return result.length ? result.join(", ") : "0 seconds";
    }

    formatToParts(duration) {
      return [{
        type: "literal",
        value: this.format(duration)
      }];
    }

    resolvedOptions() {
      return {
        locale: this.locale,
        style: this.style,
        numberingSystem:
          this.numberFormat.resolvedOptions().numberingSystem
      };
    }
  }

  Object.defineProperty(DurationFormat.prototype, Symbol.toStringTag, {
    value: "Intl.DurationFormat",
    configurable: true
  });

  Object.defineProperty(Intl, "DurationFormat", {
    value: DurationFormat,
    writable: true,
    configurable: true
  });
})();
