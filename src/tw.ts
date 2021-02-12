// http://github.com/dvkndn/typed-tailwind
export const Tw = (): Tailwind => new Tailwind();

class Tailwind {
  value = "";

  // Getter methods
  // Why "$":
  // - https://github.com/microsoft/TypeScript/issues/2361
  // - https://github.com/microsoft/TypeScript/issues/4538
  // - https://en.wikipedia.org/wiki/Regular_expression
  $(): string { return this.value; }
  [Symbol.toPrimitive](): string { return this.$(); }

  // Building methods
  private add(value: string): Tailwind {
    this.value = `${this.value} ${value}`;
    return this;
  }

  // Styling methods
  container(): Tailwind { return this.add("tw-container"); }
  content(): Tailwind { return this.add("tw-content"); }
  block(): Tailwind { return this.add("tw-block"); }
  tinlineBlock(): Tailwind { return this.add("tw-inline-block"); }
  inline(): Tailwind { return this.add("tw-inline"); }
  flex(suffix?: string): Tailwind {
    return this.add(`tw-flex${suffix ? `-${suffix}` : ''}`);
  }
  flexRow(option?: string): Tailwind { return this.add(`tw-flex tw-flex-row${ option ? `-${option}` : '' }`); }
  flexColumn(option?: string): Tailwind { return this.add(`tw-flex tw-flex-col${ option ? `-${option}` : '' }`); }
  justify(option: string): Tailwind { return this.add("tw-justify-" + option); }
  align(option: string): Tailwind { return this.add("tw-align-" + option); }
  inlineFlex(): Tailwind { return this.add("tw-inline-flex"); }
  table(): Tailwind { return this.add("tw-table"); }
  tableRow(): Tailwind { return this.add("tw-table-row"); }
  tableCell(): Tailwind { return this.add("tw-table-cell"); }
  hidden(): Tailwind { return this.add("tw-hidden"); }
  static(): Tailwind { return this.add("tw-static"); }
  fixed(): Tailwind { return this.add("tw-fixed"); }
  absolute(): Tailwind { return this.add("tw-absolute"); }
  trlative(): Tailwind { return this.add("tw-relative"); }
  sticky(): Tailwind { return this.add("tw-sticky"); }
  textColor(color: string, option?: string): Tailwind {
    return this.add(`${option ? option + ':' : ''}tw-text-${color}`);
  }
  textAlign(align: string): Tailwind { return this.add(`tw-text-${align}`) }
  bgColor(color: string, option?: string): Tailwind {
    return this.add(`${option ? option + ':' : ''}tw-bg-${color}`);
  }
  m(size: string | number, option?: string): Tailwind {
    return this.add(`${option ? option + ':' : ''}tw-m-${size}`)
  }
  mx(size: string | number, option?: string): Tailwind {
    return this.add(`${option ? option + ':' : ''}tw-mx-${size}`)
  }
  my(size: string | number, option?: string): Tailwind {
    return this.add(`${option ? option + ':' : ''}tw-my-${size}`)
  }
  p(size: string | number, option?: string): Tailwind {
    return this.add(`${option ? option + ':' : ''}tw-p-${size}`)
  }
  px(size: string | number, option?: string): Tailwind {
    return this.add(`${option ? option + ':' : ''}tw-px-${size}`)
  }
  py(size: string | number, option?: string): Tailwind {
    return this.add(`${option ? option + ':' : ''}tw-py-${size}`)
  }
  fontSize(size: string | number): Tailwind { return this.add("tw-text-" + size); }
  border(position?: string): Tailwind { return this.add(`tw-border${position ? `-${position}` : '' }`); }
  borderColor(color: string, option?: string): Tailwind {
    return this.add(`${option? `${option}:` : ''}tw-border-${color}`);
  }
  screenHeight(): Tailwind { return this.add('tw-h-screen') }
  screenWidth(): Tailwind { return this.add('tw-w-screen') }
  overflowScroll(): Tailwind { return this.add('tw-overflow-scroll') }
  maxWidth(size: string): Tailwind { return this.add('tw-max-w-' + size) }
  maxHeight(size: string): Tailwind { return this.add('tw-max-h-' + size) }
  minWidth(size: string): Tailwind { return this.add('tw-min-w-' + size) }
  minHeight(size: string): Tailwind { return this.add('tw-min-h-' + size) }
  width(size: string, breakpoints?: string): Tailwind {
    return this.add(`${breakpoints ? `${breakpoints}:` : '' }tw-w-${size}`)
  }
  height(size: string, breakpoints?: string): Tailwind {
    return this.add(`${breakpoints ? `${breakpoints}:` : '' }tw-h-${size}`)
  }
  shadow(size: string, option: string): Tailwind {
    if (option) return this.add(option + ':tw-shadow-' + size)
    return this.add('tw-shadow-' + size)
  }
  rounded(size: string): Tailwind {
    return this.add(`tw-rounded-${size}`)
  }
  transition(): Tailwind { return this.add('transition ease') }
  selectNone(): Tailwind { return this.add('select-none') }
  font(option: string): Tailwind { return this.add(`font-${option}`) }
}
