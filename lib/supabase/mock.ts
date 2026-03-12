const MISSING_SUPABASE_ENV_MESSAGE =
  "Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, and set SUPABASE_SERVICE_ROLE_KEY for admin features."

type QueryResult = {
  data: unknown
  error: Error
  count: number
}

function createMissingEnvError() {
  return new Error(MISSING_SUPABASE_ENV_MESSAGE)
}

class MockQueryBuilder implements PromiseLike<QueryResult> {
  private result: QueryResult

  constructor() {
    this.result = {
      data: [],
      error: createMissingEnvError(),
      count: 0,
    }
  }

  select(_columns?: string, options?: { head?: boolean }) {
    this.result = {
      data: options?.head ? null : [],
      error: createMissingEnvError(),
      count: 0,
    }
    return this
  }

  insert(_values?: unknown) {
    this.result = { data: null, error: createMissingEnvError(), count: 0 }
    return this
  }

  update(_values?: unknown) {
    this.result = { data: null, error: createMissingEnvError(), count: 0 }
    return this
  }

  delete() {
    this.result = { data: null, error: createMissingEnvError(), count: 0 }
    return this
  }

  upsert(_values?: unknown) {
    this.result = { data: null, error: createMissingEnvError(), count: 0 }
    return this
  }

  eq(_column: string, _value: unknown) {
    return this
  }

  neq(_column: string, _value: unknown) {
    return this
  }

  in(_column: string, _values: unknown[]) {
    return this
  }

  order(_column: string, _options?: unknown) {
    return this
  }

  limit(_count: number) {
    return this
  }

  range(_from: number, _to: number) {
    return this
  }

  single() {
    this.result = { data: null, error: createMissingEnvError(), count: 0 }
    return this
  }

  maybeSingle() {
    this.result = { data: null, error: createMissingEnvError(), count: 0 }
    return this
  }

  then<TResult1 = QueryResult, TResult2 = never>(
    onfulfilled?: ((value: QueryResult) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    return Promise.resolve(this.result).then(onfulfilled, onrejected)
  }
}

export function createMockSupabaseClient() {
  return {
    from(_table: string) {
      return new MockQueryBuilder()
    },
  }
}

export function logMissingSupabaseEnv(serviceRoleRequired = false) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL")
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }

  if (serviceRoleRequired && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("Missing environment variable: SUPABASE_SERVICE_ROLE_KEY (admin operations may fail)")
  }
}

export function hasPublicSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export function hasAdminSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  )
}
