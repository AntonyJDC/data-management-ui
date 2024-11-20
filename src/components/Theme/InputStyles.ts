export const styles: {
  [key: string]: {};
} = {
  input:
    'block pl-3 pr-2.5 pb-2.5 pt-3 h-12 w-full text-base font-medium bg-inherit border-[0.5px] placeholder:opacity-0   appearance-none focus:outline-none focus:ring-1 focus:placeholder:opacity-100 peer disabled:cursor-not-allowed disabled:opacity-40 transition-colors duration-200',
  label:
    'absolute text-base font-bold duration-200 transform -translate-y-4 translate-x-1.5 scale-75 top-1 origin-[0] bg-inherit px-2 peer-focus:px-2 peer-placeholder-shown:font-medium peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-x-0  peer-focus:translate-x-1.5 peer-focus:top-1 peer-focus:font-bold peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 peer-disabled:text-opacity-40',
  textAreaLabel:
    'absolute text-base font-bold duration-200 transform -translate-y-4 translate-x-1.5 scale-75 top-1 origin-[0] bg-inherit px-2 peer-focus:px-2 peer-placeholder-shown:font-medium peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1.5 peer-focus:top-1 peer-focus:font-bold peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 peer-disabled:text-opacity-40',
};

export const colorVariants: {
  [key: string]: { input: string; label: string };
} = {
  default: {
    input:
      'text-base-content border-base-content/50 placeholder:text-base-content/50 hover:border-base-content focus:ring-base-content focus:border-base-content disabled:border-base-content/40',
    label:
      'text-base-content/60 peer-focus:text-base-content peer-hover:text-base-content peer-disabled:peer-hover:text-base-content/60',
  },
  success: {
    input:
      'text-success border-success/50 placeholder:text-success/50 hover:border-success focus:ring-success focus:border-success disabled:border-success/40',
    label:
      'text-success/60 peer-focus:text-success peer-hover:text-success peer-disabled:peer-hover:text-success/60',
  },
  error: {
    input:
      'text-error border-error/50 placeholder:text-error/50 hover:border-error focus:ring-error focus:border-error disabled:border-error/40',
    label:
      'text-error/60 peer-focus:text-error peer-hover:text-error peer-disabled:peer-hover:text-error/60',
  },
  warning: {
    input:
      'text-warning border-warning/50 placeholder:text-warning/50 hover:border-warning focus:ring-warning focus:border-warning disabled:border-warning/40',
    label:
      'text-warning/60 peer-focus:text-warning peer-hover:text-warning peer-disabled:peer-hover:text-warning/60',
  },
  info: {
    input:
      'text-info border-info/50 placeholder:text-info/50 hover:border-info focus:ring-info focus:border-info disabled:border-info/40',
    label:
      'text-info/60 peer-focus:text-info peer-hover:text-info peer-disabled:peer-hover:text-info/60',
  },
  primary: {
    input:
      'text-primary border-primary/50 border-opacity-50 placeholder:text-primary/50 hover:border-primary focus:ring-primary focus:border-primary disabled:border-primary/40',
    label:
      'text-primary/60 text- peer-focus:text-primary peer-hover:text-primary peer-disabled:peer-hover:text-primary/60',
  },
  secondary: {
    input:
      'text-secondary border-secondary/50 placeholder:text-secondary/50 hover:border-secondary focus:ring-secondary focus:border-secondary disabled:border-secondary/40',
    label:
      'text-secondary/60 peer-focus:text-secondary peer-hover:text-secondary peer-disabled:peer-hover:text-secondary/60',
  },
  accent: {
    input:
      'text-accent border-accent/50 placeholder:text-accent/50 hover:border-accent focus:ring-accent focus:border-accent disabled:border-accent/40',
    label:
      'text-accent/60 peer-focus:text-accent peer-hover:text-accent peer-disabled:peer-hover:text-accent/60',
  },
};
